// Gallery Image Configuration
// Add your image filenames here - they will be automatically prefixed with the correct path

const imageConfig = {
    corporate: [
        'image1.jpeg', 'image2.jpeg', 'image3.jpeg', 'image4.jpeg', 'image5.jpeg',
        'image6.jpeg', 'image7.jpeg', 'image8.jpeg', 'image9.jpeg', 'image10.jpeg',
        'image11.jpeg', 'image12.jpeg', 'image13.jpeg', 'image14.jpeg', 'image15.jpeg',
        'image16.jpeg', 'image17.jpeg', 'image18.jpeg', 'image19.jpeg', 'image20.jpeg',
        'image21.jpeg', 'image22.jpeg', 'image23.jpeg', 'image24.jpeg', 'image25.jpeg',
        'image26.jpeg', 'image27.jpeg', 'image28.jpeg', 'image29.jpeg', 'image30.jpeg',
        'image31.jpeg', 'image32.jpeg', 'image33.jpeg', 'image34.jpeg', 'image35.jpeg',
        'image36.jpeg', 'image37.jpeg', 'image38.jpeg', 'image39.jpeg', 'image40.jpeg',
        'image41.jpeg', 'image42.jpeg', 'image43.jpeg', 'image44.jpeg', 'image45.jpeg',
        'image46.jpeg', 'image47.jpeg', 'image48.jpeg', 'image49.jpeg', 'image50.jpeg',
        'image51.jpeg'
    ],
    social: [
        'image1.jpeg', 'image2.jpeg', 'image3.jpeg', 'image4.jpeg', 'image5.jpeg',
        'image6.jpeg', 'image7.jpeg', 'image8.jpeg', 'image9.jpeg', 'image10.jpeg',
        'image11.jpeg', 'image12.jpeg', 'image13.jpeg', 'image14.jpeg', 'image15.jpeg',
        'image16.jpeg', 'image17.jpeg', 'image18.jpeg', 'image19.jpeg', 'image20.jpeg',
        'image21.jpeg', 'image22.jpeg', 'image23.jpeg', 'image24.jpeg', 'image25.jpeg',
        'image26.jpeg', 'image27.jpeg', 'image28.jpeg', 'image29.jpeg', 'image30.jpeg',
        'image31.jpeg', 'image32.jpeg', 'image33.jpeg', 'image34.jpeg', 'image35.jpeg',
        'image36.jpeg', 'image37.jpeg', 'image38.jpeg', 'image39.jpeg', 'image40.jpeg',
        'image41.jpeg', 'image42.jpeg', 'image43.jpeg', 'image44.jpeg', 'image45.jpeg',
        'image46.jpeg', 'image47.jpeg', 'image48.jpeg', 'image49.jpeg', 'image50.jpeg',
        'image51.jpeg', 'image52.jpeg', 'image53.jpeg', 'image54.jpeg', 
        'image56.jpeg'
    ],
    wedding: [
        'image1.jpeg', 'image2.jpeg', 'image3.jpeg', 'image4.jpeg', 'image5.jpeg',
        'image6.jpeg', 'image7.jpeg', 'image8.jpeg', 'image9.jpeg', 'image10.jpeg',
        'image11.jpeg', 'image12.jpeg', 'image13.jpeg', 'image14.jpeg', 'image15.jpeg',
        'image16.jpeg', 'image17.jpeg', 'image18.jpeg', 'image19.jpeg', 'image20.jpeg',
        'image21.jpeg', 'image22.jpeg', 'image23.jpeg', 'image24.jpeg', 'image25.jpeg',
        'image26.jpeg', 'image27.jpeg', 'image28.jpeg', 'image29.jpeg', 'image30.jpeg',
        'image31.jpeg', 'image32.jpeg', 'image33.jpeg', 'image34.jpeg', 'image35.jpeg',
        'image36.jpeg', 'image37.jpeg', 'image38.jpeg'
    ],
    audiovisual: [
        'image1.jpeg', 'image2.jpeg', 'image3.jpeg', 'image4.jpeg', 'image5.jpeg',
        'image6.jpeg', 'image7.jpeg', 'image8.jpeg', 'image9.jpeg', 'image10.jpeg',
        'image11.jpeg', 'image12.jpeg', 'image13.jpeg', 'image14.jpeg', 'image15.jpeg',
        'image16.jpeg', 'image17.jpeg', 'image18.jpeg', 'image19.jpeg', 'image20.jpeg',
        'image21.jpeg', 'image22.jpeg', 'image23.jpeg', 'image24.jpeg', 'image25.jpeg',
        'image26.jpeg', 'image27.jpeg', 'image28.jpeg', 'image29.jpeg', 'image30.jpeg',
        'image31.jpeg', 'image32.jpeg', 'image33.jpeg', 'image34.jpeg', 'image35.jpeg',
        'image36.jpeg', 'image37.jpeg', 'image38.jpeg', 'image39.jpeg', 'image40.jpeg',
        'image41.jpeg', 'image42.jpeg', 'image43.jpeg', 'image44.jpeg', 'image45.jpeg',
        'image46.jpeg', 'image47.jpeg', 'image48.jpeg', 'image49.jpeg', 'image50.jpeg'
    ]
};

// Build full paths
const galleryData = {};
Object.keys(imageConfig).forEach(category => {
    galleryData[category] = imageConfig[category].map(filename => 
        `assets/images/gallery/${category}/${filename}`
    );
});
