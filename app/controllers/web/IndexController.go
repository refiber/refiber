package web

import (
	support "github.com/refiber/framework/support"

	"github.com/gofiber/fiber/v2"
)

func (web *webController) Index(s support.Refiber) error {
	return web.inertia.Render().Page("Home", &fiber.Map{
		"hello": "World",
	})
}

func (web *webController) About(s support.Refiber) error {
	return web.inertia.Render().Page("About", nil)
}
