import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddPage from "@/app/add/page";

describe("AddPage component", () => {
  it("renders without errors", () => {
    render(<AddPage />);
    // レンダリングがエラーなく成功したことを確認
  });

  it("allows uploading an image and displays it", () => {
    render(<AddPage />);
    const input = screen.getByTestId("image-upload-input");

    // ダミーの画像ファイルを作成
    const imageFile = new File(["(binarydata)"], "test.png", { type: "image/png" });

    // 画像をアップロード
    fireEvent.change(input, { target: { files: [imageFile] } });

    // 画像が表示されていることを確認
    const uploadedImage = screen.getByAltText("Uploaded Image");
    expect(uploadedImage).toBeInTheDocument();
  });

  it("changes text style on select change", () => {
    render(<AddPage />);
    const select = screen.getByTestId("text-size-select");

    // テキストサイズの選択を変更
    fireEvent.change(select, { target: { value: "84" } });

    // テキストのスタイルが変更されたことを確認
    const textElement = screen.getByText("LGTM");
    expect(textElement).toHaveStyle("font-size: 84px");
  });

  it("changes text color on color input change", () => {
    render(<AddPage />);
    const colorInput = screen.getByTestId("text-color-input");

    // テキストカラーの選択を変更
    fireEvent.change(colorInput, { target: { value: "#FF0000" } });

    // テキストのカラーが変更されたことを確認
    const textElement = screen.getByText("LGTM");
    expect(textElement).toHaveStyle("color: #FF0000");
  });

  it("changes font family on select change", () => {
    render(<AddPage />);
    const select = screen.getByTestId("font-family-select");

    // フォントファミリーの選択を変更
    fireEvent.change(select, { target: { value: "Verdana" } });

    // テキストのフォントファミリーが変更されたことを確認
    const textElement = screen.getByText("LGTM");
    expect(textElement).toHaveStyle("font-family: Verdana");
  });
});
