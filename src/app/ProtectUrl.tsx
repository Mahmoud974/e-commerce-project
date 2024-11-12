// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, ComponentType } from "react";

// const withAuth = <P extends Record<string, unknown>>(
//   WrappedComponent: ComponentType<P>
// ) => {
//   const AuthenticatedComponent = (props: P) => {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     useEffect(() => {
//       if (status === "unauthenticated") {
//         router.push("/login");
//       }
//     }, [status, router]);

//     if (status === "loading") {
//       return <div>Chargement...</div>;
//     }

//     return session ? <WrappedComponent {...props} /> : null;
//   };

//   AuthenticatedComponent.displayName = `withAuth(${
//     WrappedComponent.displayName || WrappedComponent.name || "Component"
//   })`;

//   return AuthenticatedComponent;
// };

// export default withAuth;
