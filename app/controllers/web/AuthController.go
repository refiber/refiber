package web

import (
	support "github.com/refiber/framework/support"

	"bykevin.work/refiber/app/models"
)

func (web *webController) Login(s support.Refiber) error {
	return web.inertia.Render().Page("Login", nil)
}

func (web *webController) Auth(s support.Refiber) error {
	type Auth struct {
		Email    string `validate:"required,email"`
		Password string `validate:"required,min=3"`
	}
	auth := new(Auth)

	if err := s.GetCtx().BodyParser(auth); err != nil {
		return s.Redirect().Back().WithMessage(support.MessageTypeError, "Internal Server Error").Now()
	}

	if err := s.Validate(auth); err != nil {
		return s.Redirect().Back().Now()
	}

	var errorFields []*support.ValidationErrorField
	if auth.Email != "test@mail.com" {
		e := support.ValidationErrorField{Name: "email", Message: "Email not found"}
		errorFields = append(errorFields, &e)
	}

	if auth.Password != "secret" {
		e := support.ValidationErrorField{Name: "password", Message: "Invalid password"}
		errorFields = append(errorFields, &e)
	}

	if len(errorFields) > 0 {
		s.CreateValidationErrors(errorFields)
		return s.Redirect().Back().Now()
	}

	user := models.User{
		ID:    "user-1",
		Name:  "Kevin",
		Email: auth.Email,
	}

	if err := s.NewAuthenticatedUserSession(user); err != nil {
		return s.Redirect().To("/").WithMessage(support.MessageTypeError, "Something was wrong, please try again later").Now()
	}

	/**
	 * when redirecting with message, it also will pass data, flash: { type: 'success', message: 'Welcome!'} in your props
	 * open Layout.tsx to see how flash message implemented
	 * you can use support.AuthRedirection(s, "/") instead to redirect without message
	 */
	return support.AuthRedirectionWithMessage(s, "/", support.MessageTypeSuccess, "Welcome!")
}

func (web *webController) Logout(s support.Refiber) error {
	s.DestroyAuthenticatedUserSession()
	return s.Redirect().Back().WithMessage(support.MessageTypeError, "Goodbye 👋").Now()
}
