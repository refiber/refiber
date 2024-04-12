package web

import (
	support "github.com/refiber/framework/support"
)

func (web *webController) Profile(s support.Refiber) error {
	return web.inertia.Render().Page("Profile", nil)
}
