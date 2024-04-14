# Refiber

A web framework based on the [Gofiber](gofiber.io) framework, follows the MVC architecture (Model, View & Controller).

Refiber comes with [Inertia.js](https://inertiajs.com/) built-in. [Inertia.js](https://inertiajs.com/) is a powerful tool for creating Single Page Applications (SPA) without needing a separate API.

```go
// in your Go Controller
func (web *webController) Index(s support.Refiber) error {
	return web.inertia.Render().Page("Home", &fiber.Map{
		"hello": "World",
	})
}
```

```tsx
// in your React App
export default function HomePage({ hello }) {
	return <h1>Hello {hello}</h1>;
}
```

## Documentation

Online documentation [https://refiber.notion.site](https://refiber.notion.site/Refiber-Docs-613336569bcd439ca74c27e30d46a491?pvs=4)

## Quick Install

To install Refiber, you first need to install the installer/CLI. Use the following command:

```
git clone https://github.com/refiber/installer ~/.refiber
```

Next, run the following command to add Refiber to your environment variable:

```
echo 'export PATH="$HOME/.refiber/bin:$PATH"' >> ~/.zshrc

source ~/.zshrc
```

Now you can just run this command bellow to create a new Refiber proejct

```
refiber new my-app
```
