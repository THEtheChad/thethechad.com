// HTML invoker commands (`<button commandfor="id" command="show-modal">`).
// They let a button open or close a <dialog> with no JavaScript, so the mobile
// menu still works when JS is off. @types/react does not list them yet.
import "react";

declare module "react" {
  interface ButtonHTMLAttributes<T> {
    command?: "show-modal" | "close" | "request-close" | (string & {});
    commandfor?: string;
  }

  // Light-dismiss for <dialog> (backdrop tap closes it) without JS.
  interface DialogHTMLAttributes<T> {
    closedby?: "any" | "closerequest" | "none";
  }
}
