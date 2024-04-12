package web

import (
	"github.com/refiber/framework/inertia"

	"bykevin.work/refiber/app"
)

func Setup(app *app.App) *webController {
	inertia := inertia.New(app.Refiber)
	return &webController{inertia: inertia}
}

type webController struct {
	inertia inertia.InertiaInterface
}
