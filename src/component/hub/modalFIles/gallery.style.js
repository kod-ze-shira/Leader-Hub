import styled, { css, createGlobalStyle } from 'styled-components';

export const WrapGridGalleryaa = styled.div`
 overflow:${(props) => props.frame.view && 'none' || 'hidden'};
`;

export const GalerySlideStyle = createGlobalStyle`
  .carousel-indicators{
    position:relative;
    top:calc(32vw + 50px);
  }
  .carousel {
  }

.slie-gallery{
    top:-30px !important;
}
 
  .carousel-indicators li{
    width:10px!important;
    height:10px!important;
    background-color:${(props) => props.color || 'gray'}!important;
    border-radius:50%;
  }
  .carousel-caption{
        color:${(props) => props.color || 'gray'}!important;
        bottom: 20px!important;
        padding:0 !important
  }
  .PrivateSwitchBase-input-4{
    opacity: 0 !important;
  }

  @media (max-width: 600px) {
    .carousel-indicators{
        top: 200px;
      }    
}

`

export const GaleryGridStyle = createGlobalStyle`
    .ReactGridGallery_custom-overlay{
        pointer-events:auto!important
    }
   
    
`
// .react-photo-gallery--gallery img{
//     cursor:${props => props.lightbox && 'pointer' || 'auto'} 
// }

export const WrapGridGallery = styled.div`
    display: block;
    min-height: 1px;
    width: 100%;
    overflow: auto;
`
const ArrowGalleryCarousel = css`
    // display:none;
    // color: ${(props) => props.color || 'gray'};
    color:  'gray';
    font-size: 60px;
    font-weight: 900;
    @media(max - width: 600px) {
        font-size: 35px!important;
    }
`
export const ArrowGalleryCarouselNext = styled.span`
padding-right: 30px;
${ArrowGalleryCarousel}

@media(max-width: 600px) {
    padding-right: 10px!important;
}
`

export const ArrowGalleryCarouselPrev = styled.span`
padding-left: 30px;
${ArrowGalleryCarousel}

@media(max-width: 600px) {
    padding-left: 10px!important;
}
`

export const GalleryImage = styled.img`
    width:100%;
    height:32vw;
    background-image:url(${(props) => props.src});
    background-size:cover;
    background-Position: center center;
    position:relative;

    @media (max-width: 600px) {
        height:150px!important;
    }
`

export const HoverImageDiv = styled.div`
    background-color: rgb(113 113 113 / 47%);
    max-height: 240px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: white;
    padding: 2px;
    font-size: 90%;
`

export const HoverImageWapperDiv = styled.div`
    opacity: ${(props) => props.hover ? '1' : '0'};
    position: absolute;
    top:${prop => prop.top && prop.top};
    height: ${(props) => props.height ? props.height + 'px' : '100%'};
    width: ${(props) => props.width ? props.width + 'px' : '100%'};
`

export const WapperButton = styled.div`
    display:flex;
`

export const ImageGallery = styled.div`
    background-image:url(${(props) => props.src});
    background-size: cover;
    height:${(props) => props.height && props.height}px;
    width:${(props) => props.width && props.width}px;
    cursor: move;
    z-index:100;
    position:relative;
`

export const AddPhotos = styled.div`
    height:30px;
    width: 100%;
    display: flex;
    align-items: flex-center;
    justify-content: center;
    justify-content: flex-center;
  
    `;