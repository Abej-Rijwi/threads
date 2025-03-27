import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isIgnoredRoute = createRouteMatcher(["/api/webhook/clerk"]);

export default clerkMiddleware(
  async (auth, request) => {
    if (isIgnoredRoute(request)) {
      return;
    }

    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  },
  { debug: true }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
