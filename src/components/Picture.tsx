import React from 'react';

interface PictureProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const Picture: React.FC<PictureProps> = ({ image, setImage }) => {

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    // Trigger the file input click when the image is clicked
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div id="picture">
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      {!image && (
        <label htmlFor="imageUpload" style={{ cursor: 'pointer' }} placeholder="Select your picture"></label>
      )}

      {image && (
        <img
          src={image}
          alt="Uploaded"
          onClick={handleImageClick}
          style={{ cursor: 'pointer', width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};

export default Picture;
