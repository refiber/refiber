package web

import (
	"errors"
	"fmt"

	"github.com/refiber/framework/inertia"
	"github.com/rs/zerolog/log"
	v8 "github.com/tommie/v8go"

	"bykevin.work/refiber/app"
)

// If your app doesn’t require SSR, you can remove SSRHandler and any related stuff
// Then update package.json build to "tsc && vite build"

func Setup(app *app.App) *webController {
	mainIso := v8.NewIsolate()
	iso := v8.NewIsolate()

	var cachedMainJs *v8.CompilerCachedData

	inertia := inertia.New(inertia.Config{
		App:                app,
		EnableSSRByDefault: false,
		SSRHanlder: func(s inertia.SSRInterface) *string {
			scripts := s.GetScripts()
			if cachedMainJs == nil {
				mainJs, _ := mainIso.CompileUnboundScript(string(scripts["main.js"]), "main.js", v8.CompileOptions{})
				cachedMainJs = mainJs.CreateCodeCache()
			}

			ctx := v8.NewContext(iso)
			defer ctx.Close()

			script, _ := iso.CompileUnboundScript(string(scripts["main.js"]), "main.js", v8.CompileOptions{CachedData: cachedMainJs})
			script.Run(ctx)

			init, err := ctx.RunScript(string(scripts["run.js"]), "run.js")
			result, err := resolvePromise(init, err, ctx)
			if err != nil {
				log.Error().Err(err).Msg("controllers.setup.SSRHanlder")
				return nil
			}

			resultStr := result.String()
			return &resultStr
		},
	})
	return &webController{inertia: inertia}
}

type webController struct {
	inertia inertia.InertiaInterface
}

func resolvePromise(val *v8.Value, err error, ctx *v8.Context) (*v8.Value, error) {
	if err != nil || !val.IsPromise() {
		return val, err
	}
	for {
		switch p, _ := val.AsPromise(); p.State() {
		case v8.Fulfilled:
			return p.Result(), nil
		case v8.Rejected:
			return nil, errors.New(p.Result().DetailString())
		case v8.Pending:
			ctx.PerformMicrotaskCheckpoint()
		default:
			return nil, fmt.Errorf("illegal v8.Promise state %d", p)
		}
	}
}
