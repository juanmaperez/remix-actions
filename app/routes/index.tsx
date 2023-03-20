import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export async function loader() {
  return json({ email: "example@gmail.com" });
}

export async function action({ request }: LoaderArgs) {
  const form = await request.formData();
  const email = form.get("email") as string;

  // dummy isValid email
  if (email.includes("@")) {
    // update somewhere and return the new email
    return json({ email });
  }

  return { error: "something failed" };
}

export default function Index() {
  const loaderData = useLoaderData();
  const actionData = useLoaderData();

  const email = actionData.email || loaderData.email;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20
      }}
    >
      <h2>Welcome to Remix {email ?? ""}</h2>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          padding: "10px"
        }}
        method='post'
      >
        <input type='text' name='email' defaultValue={email} required />

        {actionData?.error && (
          <p style={{ color: "salmon" }}>{actionData.error}</p>
        )}
        <button>Update email</button>
      </Form>
    </div>
  );
}
