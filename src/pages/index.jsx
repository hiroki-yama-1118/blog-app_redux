/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// /**
//  *　Homeページ
//  * @returns Homeページ
//  */
// export default function Home() {
//   //ルーターリンク
//   const router = useRouter();
//   //ブログページに遷移させる
//   useEffect(() => {
//     router.push("/blog");
//   });
//   return <></>;
// }

// export default function Upload() {
//   const uploadPhoto = async (e) => {
//     console.log("画像アップロード");
//     const file = e.target.files[0];
//     const filename = encodeURIComponent(file.name);
//     const res = await fetch(`/api/upload-url?file=${filename}`);
//     const { url, fields } = await res.json();
//     const formData = new FormData();

//     Object.entries({ ...fields, file }).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     const upload = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (upload.ok) {
//       console.log("Uploaded successfully!");
//     } else {
//       console.error("Upload failed.");
//     }
//   };

//   return (
//     <>
//       <p>Upload a .png or .jpg image (max 1MB).</p>
//       <input
//         onChange={uploadPhoto}
//         type="file"
//         accept="image/png, image/jpeg"
//       />
//     </>
//   );
// }

import React from "react";
import { useState } from "react";
import Image from "next/image";

const Home = () => {
  const [photo, setPhoto] = useState();
  const [img, setImg] = useState();
  const selectPhoto = async (e) => {
    setPhoto(e.target.files[0]);
  };

  console.dir(photo);

  const uploadPhoto = async (e) => {
    console.log("画像アップロード");

    // const urlArray = [];
    const url = await fetch("https://redux-blog-api.herokuapp.com/s3url/").then(
      (res) => res.json()
    );
    console.dir("upload" + JSON.stringify(url.url));
    const imgUrl = url.url;

    await fetch(imgUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: photo,
    });
    const imageUrl = imgUrl.split("?")[0];
    setImg(imageUrl);
    console.log(imageUrl);
  };
  return (
    <div>
      S3
      <input type="file" onChange={selectPhoto} />
      <button onClick={uploadPhoto}>Upload</button>
      <div>
        <img src={img} />
      </div>
    </div>
  );
};

export default Home;
