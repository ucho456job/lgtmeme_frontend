"use client";

import { useState } from "react";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import Button from "@/components/atoms/Button/Button";
import InputText from "@/components/atoms/InputText/InputText";
import Modal from "@/components/molecules/Modal/Modal";
import { PATCH_IMAGE_REQUEST_TYPE } from "@/constants/image";
import { ImageService } from "@/services/image.service";
import { auth } from "@/utils/supabase";
import { css } from "@@/styled-system/css";

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

  const [modal, setModal] = useState({ message: "", show: false });
  const handleClose = () => setModal({ message: "", show: false });

  const handleDelete = async (imageId: string) => {
    try {
      const service = new ImageService();
      await service.deleteImage(imageId, accessToken);
      setImages((prevImages) => prevImages.filter((pi) => pi.id !== imageId));
      setModal({ message: "Deleted an image!", show: true });
    } catch {
      setModal({ message: "Failed to delete image.", show: true });
    }
  };

  const handleConfirm = async (imageId: string) => {
    try {
      const service = new ImageService();
      await service.patchImage(imageId, { requestType: PATCH_IMAGE_REQUEST_TYPE.confirm });
      setImages((prevImages) => prevImages.filter((pi) => pi.id !== imageId));
      setModal({ message: "Confirmed an image.", show: true });
    } catch {
      setModal({ message: "Failed to confirm image.", show: true });
    }
  };

  return (
    <div>
      {user ? (
        <div className={loginCss}>
          {images.map((i) => (
            <div key={i.id} className={imageContainerCss}>
              <Image src={i.url} alt="LGTM" width={300} height={300} />
              <div>
                <Button onClick={() => handleDelete(i.id)}>Delete</Button>
                <Button onClick={() => handleConfirm(i.id)}>Confirm</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={loginCss}>
          <InputText value={email} type="email" placeholder="Email" onChange={handleChangeEmail} />
          <InputText
            value={password}
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      )}
      <Modal {...modal} onClick={handleClose} />
    </div>
  );
};

const imageContainerCss = css({ display: "flex" });
const loginCss = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "300px",
  paddingTop: "10",
  marginX: "auto",
  gap: "5",
});

export default Auth;
