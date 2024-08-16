package middleware

import (
	"github.com/gofiber/fiber/v2"

	"bykevin.work/refiber/app/models"
)

func (m *middleware) AuthWeb(c *fiber.Ctx) error {
	auth := m.app.Auth(c)

	var user *models.User
	auth.GetAuthenticatedUserSession(&user)

	if user == nil {
		return auth.LoginPage("/login")
	}

	// Get updated user data from DB, then use m.app.UpdateAuthenticatedUserSession()

	return c.Next()
}
