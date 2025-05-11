import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";

import "css/layout.css";
import { cn } from "@/lib/helpers";

/**
 * open AuthController.go to see how flash message is used
 * this toast component for demo purpose to use flash message
 */
const Toast = () => {
  const { flash } = usePage().props;

  const [message, setMessage] = useState<{ data: typeof flash; open: boolean }>(
    { data: null, open: false },
  );

  useEffect(() => {
    if (!flash) return;

    setMessage({ data: flash, open: true });
    setTimeout(() => {
      setMessage((prev) => ({ ...prev, open: false }));
    }, 3000);
  }, [flash]);

  if (!window) return null;

  return createPortal(
    <div
      className={cn(
        "transition-all absolute m-auto z-50 shadow-[0_1px_8px_3px_#21581de0] left-0 right-0  w-[300px] p-3 text-sm rounded-lg bg-green-100 text-green-700 border border-green-700",
        message.open ? "bottom-16 opacity-100" : "-bottom-10 opacity-0",
      )}
    >
      {message.data?.message}
    </div>,
    window?.document.getElementById("app")!,
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage().props;
  return (
    <>
      <Toast />

      <main className="w-full flex min-h-screen justify-center items-center text-white antialiased py-12">
        <div className="relative rounded-lg p-[4px] bg-animation">
          <div className="rounded-lg z-50 relative bg-black p-10 w-[500px]">
            <div>{children}</div>
            {auth && (
              <div className="relative group/item mt-12">
                <div className="absolute top-0 scale-90 transition opacity-0 group-hover/item:scale-105 group-hover/item:scale-y-150 group-hover/item:opacity-100 rounded-lg bg-zinc-900 z-0 left-0 w-full h-full" />
                <div className="flex justify-between items-center relative gap-6">
                  <div className="flex gap-3">
                    <img
                      alt="avatar"
                      src="https://bykevin.work/avatar.jpg"
                      className="w-[40px] h-[40px] rounded-full"
                    />

                    <div className="leading-tight">
                      <h2 className="font-medium">Kevin Adam</h2>
                      <a
                        className="text-sm text-gray-400 hover:underline"
                        href="https://github.com/vnxx"
                        target="_blank"
                      >
                        www.github.com/vnxx
                      </a>
                    </div>
                  </div>

                  <button
                    className="size-[35px] group/logout rounded-lg flex items-center justify-center hover:bg-rose-50 transition-colors"
                    onClick={() => router.post("/logout")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      className="fill-rose-900 group-hover/logout:fill-rose-500"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                    >
                      <path d="M23.117,9.879l-4.95-4.95L16.046,7.05,19.5,10.5H6.617v3H19.5l-3.45,3.45,2.121,2.121,4.95-4.95A3,3,0,0,0,23.117,9.879Z" />
                      <path d="M9.994,20.5a.5.5,0,0,1-.5.5H3.506a.5.5,0,0,1-.5-.5V3.531a.5.5,0,0,1,.5-.5H9.494a.5.5,0,0,1,.5.5V8.345h3V3.531a3.505,3.505,0,0,0-3.5-3.5H3.506a3.505,3.505,0,0,0-3.5,3.5V20.5a3.5,3.5,0,0,0,3.5,3.5H9.494a3.5,3.5,0,0,0,3.5-3.5V15.683h-3Z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
