import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 *　Homeページ
 * @returns Homeページ
 */
export default function Home() {
  //ルーターリンク
  const router = useRouter();
  //ブログページに遷移させる
  useEffect(() => {
    router.push("/blog");
  });
  return <></>;
}
