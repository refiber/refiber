package routes

import (
	"github.com/refiber/framework/router"

	"bykevin.work/refiber/app"
	"bykevin.work/refiber/app/controllers/web"
	"bykevin.work/refiber/app/middleware"
)

func RegisterWeb(r router.RouterInterface, app *app.App) {
	m := middleware.Setup(app)
	controller := web.Setup(app)

	route := r.Group("/", m.SharedWeb)

	route.Get("/", controller.Index)
	route.Get("/about", controller.About)

	profile := route.Group("/profile", m.AuthWeb)
	profile.Get("/", controller.Profile)

	route.Get("/login", controller.Login, m.Guest)
	route.Post("/login", controller.Auth)
	route.Post("/logout", controller.Logout)
}
