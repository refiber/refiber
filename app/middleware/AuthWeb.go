package middleware

import (
	"github.com/refiber/framework/support"

	"bykevin.work/refiber/app/models"
	"github.com/gofiber/fiber/v2"
)

func (m *middleware) AuthWeb(c *fiber.Ctx) error {
	var user *models.User
	m.app.GetAuthenticatedUserSession(&user)

	if user == nil {
		return support.AuthLoginPage("/login", m.app.Refiber)
	}

	// Get updated user data from DB, then use m.app.UpdateAuthenticatedUserSession()

	return c.Next()
}
