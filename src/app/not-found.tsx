import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold">404</h1>

          <p className="text-xl mt-4">Page Not Found</p>
        </div>
      </div>
    </>
  );
}
