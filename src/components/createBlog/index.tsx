import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

const CreateBlog: React.FC = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <div> This is Create Blog page</div>
      <Editor
        apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          plugins: [
            // Core editing features
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Sep 22, 2024:
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          file_picker_types: "image",
          /* and here's our custom image picker*/
          file_picker_callback: (cb) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            const changeEventHandler = (
              e: Event
            ) => {
              const { files } = (e.target as HTMLInputElement); 
              if (files && files[0]) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  const id = "blobid" + new Date().getTime();
                  const blobCache =
                    editorRef.current?.editorManager?.activeEditor?.editorUpload
                      .blobCache;
                  const base64 = reader.result?.toString().split(",")[1] || "";
                  const blobInfo = blobCache?.create(id, files[0], base64);
                  if (blobInfo && blobCache) {
                    blobCache.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo?.blobUri(), { title: files[0].name });
                  }
                });
                reader.readAsDataURL(files[0]);
              }
            };
            input.addEventListener("change", changeEventHandler);
            input.click();
          },
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};

export default CreateBlog;
