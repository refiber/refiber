import { Link, useForm } from "@inertiajs/react";
import { InputHTMLAttributes, useMemo } from "react";

import Layout from "components/Layout";

import { cn } from "lib/helpers";

export default function LoginPage() {
	const form = useForm("Auth", {
		email: "test@mail",
		password: "",
	});

	return (
		<div>
			<div className="text-3xl font-semibold flex">
				<Link
					href="/"
					className="hover:underline hover:text-white text-gray-300 font-normal"
				>
					<h2>Refiber</h2>
				</Link>
				<div className="mx-3">/</div>
				<h1>Login</h1>
			</div>

			<p className="mt-3 text-gray-200">
				An example login form, use secret as password
			</p>

			<div className="mt-6 flex gap-3">
				<form
					className="w-full space-y-4"
					onSubmit={(e) => {
						e.preventDefault();
						form.post("/login", {
							onError: (err) => {
								const errKeys = Object.keys(err);
								(e as any).target[errKeys[0]].focus();
							},
						});
					}}
				>
					<Input
						name="email"
						type="email"
						defaultValue={form.data.email}
						placeholder="email"
						error={form.errors.email}
						onChange={(e) => form.setData("email", e.target.value)}
					/>

					<Input
						name="password"
						type="password"
						placeholder="password"
						error={form.errors.password}
						onChange={(e) => form.setData("password", e.target.value)}
					/>

					<button
						className="rounded-md w-full bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
						type="submit"
						disabled={form.processing}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { error?: string };

const Input = ({ error, className, ...props }: InputProps) => {
	const isError = useMemo(() => Boolean(error), [error]);

	return (
		<div>
			<div className="relative rounded">
				<input
					{...props}
					className={cn(
						"block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6",
						!isError
							? "text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
							: "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500 pr-10",
						className
					)}
				/>
				<div
					className={cn(
						"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
						isError ? "visible" : "hidden"
					)}
				>
					<svg
						className="h-5 w-5 text-red-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
							clipRule="evenodd"
						></path>
					</svg>
				</div>
			</div>
			<p
				className={cn(
					"mt-2 text-sm text-red-600",
					isError ? "visible" : "hidden"
				)}
			>
				{error}
			</p>
		</div>
	);
};

LoginPage.layout = (page: React.ReactNode) => <Layout children={page} />;
