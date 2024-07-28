"use client";

import React, { ChangeEvent, useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type Crop = {
    x: number;
    y: number;
    width: number;
    height: number;
    aspect?: number;
    unit: "px" | "%";
};

const Cropper = () => {
    const [src, selectFile] = useState<string | null>(null)
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            selectFile(URL.createObjectURL(file))
        }
    }


    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, width: 0, height: 0, aspect: 1 / 1, unit: "px" });

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <input type='file' accept='image/*' onChange={handleFileChange} /> {/* fix this @AndrxwWxng */}
                </div>
                <div className='col-6'>
                    {src && (
                        <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cropper;