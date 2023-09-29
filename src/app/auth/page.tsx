"use client";

import { useState } from "react";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import { PATCH_IMAGE_REQUEST_TYPE } from "@/constants/image";
import { ImageService } from "@/services/image.service";
import { auth } from "@/utils/supabase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const handleChangeEmail = (value: string) => setEmail(value);

  const [password, setPassword] = useState("");
  const handleChangePassword = (value: string) => setPassword(value);

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const handleLogin = async () => {
    try {
      const { data } = await auth.signInWithPassword({ email, password });
      setUser(data.user);
      setAccessToken(data.session?.access_token!);
      const service = new ImageService();
      const images = await service.fetchImages({ confirm: "true" });
      setImages(images);
    } catch {
      alert("Error");
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      const service = new ImageService();
      await service.deleteImage(imageId, accessToken);
    } catch {
      alert("Error");
    }
  };

  const handleConfirm = async (imageId: string) => {
    try {
      const service = new ImageService();
      await service.patchImage(imageId, { requestType: PATCH_IMAGE_REQUEST_TYPE.confirm });
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      {user ? (
        <div>
          {images.map((i) => (
            <div key={i.id}>
              <Image src={i.url} alt="LGTM" width={300} height={300} />
              <button onClick={() => handleDelete(i.id)}>Delete</button>
              <button onClick={() => handleConfirm(i.id)}>Confirm</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <input type="email" value={email} onChange={(e) => handleChangeEmail(e.target.value)} />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => handleChangePassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
