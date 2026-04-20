"use client";
import { Button } from "../shared/ui/Button/button";
import Link from "next/link";

// type Props = {};

const NotFoundPage = () => {
  return (
    <div>
      404 not-found
      <Link href={"/"}>
        {" "}
        <Button>Back to main</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
