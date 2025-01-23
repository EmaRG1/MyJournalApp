import { ImageListItem, ImageList } from '@mui/material';

export const ImageGallery = ({images}) => {
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      { images?.map((url) => (
        <ImageListItem key={url}>
          <img
            src={`${url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='imagen'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}