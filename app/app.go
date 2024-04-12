package app

import "github.com/refiber/framework/support"

/**
 * you can add other services here like S3, etc
 * and then you can access it as receiver in all controllers & middlewares
 */

type App struct {
	support.Refiber
}

func New(support support.Refiber) *App {
	return &App{support}
}
