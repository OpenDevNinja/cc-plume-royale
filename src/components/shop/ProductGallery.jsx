// src/components/shop/ProductGallery.jsx
import { useState } from 'react'

function ProductGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(images[0])

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === image ? 'border-primary-500' : 'border-transparent'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
            <div className="flex-1 order-1 md:order-2">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src={selectedImage}
                        alt="Product main"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductGallery