package web

import (
	"github.com/gofiber/fiber/v2"
	support "github.com/refiber/framework/support"

	"bykevin.work/refiber/app/models"
)

func (web *webController) Login(s support.Refiber, c *fiber.Ctx) error {
	return web.inertia.Render(c).Page("Login", nil)
}

func (web *webController) Auth(s support.Refiber, c *fiber.Ctx) error {
	type Input struct {
		Email    string `validate:"required,email"`
		Password string `validate:"required,min=3"`
	}
	input := new(Input)

	redirect := s.Redirect(c)

	if err := c.BodyParser(input); err != nil {
		return redirect.Back().WithMessage(support.MessageTypeError, "Internal Server Error").Now()
	}

	validation := s.Validation(c)

	if err := validation.Validate(input); err != nil {
		return redirect.Back().Now()
	}

	var errorFields []*support.ValidationErrorField
	if input.Email != "test@mail.com" {
		e := support.ValidationErrorField{Name: "Email", Message: "Email not found"}
		errorFields = append(errorFields, &e)
	}

	if input.Password != "secret" {
		e := support.ValidationErrorField{Name: "Password", Message: "Invalid password"}
		errorFields = append(errorFields, &e)
	}

	if len(errorFields) > 0 {
		validation.SetErrors(errorFields)
		return redirect.Back().Now()
	}

	user := models.User{
		ID:    "user-1",
		Name:  "Kevin",
		Email: input.Email,
	}

	auth := s.Auth(c)

	if err := auth.NewAuthenticatedUserSession(user); err != nil {
		return redirect.To("/").WithMessage(support.MessageTypeError, "Something was wrong, please try again later").Now()
	}

	/**
	 * when redirecting with message, it also will pass data, flash: { type: 'success', message: 'Welcome!'} in your props
	 * open Layout.tsx to see how flash message implemented
	 * you can use auth.RedirectTo("/") instead to redirect without message
	 */
	return auth.RedirectToWithMessage("/", support.MessageTypeSuccess, "Welcome!")
}

func (web *webController) Logout(s support.Refiber, c *fiber.Ctx) error {
	s.Auth(c).DestroyAuthenticatedUserSession()
	return s.Redirect(c).Back().WithMessage(support.MessageTypeError, "Goodbye 👋").Now()
}
