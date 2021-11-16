import "./HomePage.css";
import { useState } from 'react';
//import ReactDOM  from 'react-dom';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import welcome from "../../../../Assets/welcome.jpg"
import sale from "../../../../Assets/sale.jpg"
import cart from "../../../../Assets/cart.jpg"


const items = [
  {
    src:welcome ,
    alt: 'Welcome',
    title: "Welcome my coupon site!",
    caption: "Got some coupons to offer you!"
  },
  {
    src: cart,
    alt: 'Slide 2',
    title: "Get the best deals!",
    caption: "Add all the coupons you would like!"
  },
  {
    src: sale,
    alt: 'Slide 3',
    title: "Check out our sales",
    caption: 'Please check it!'
  }
];

function HomePage(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.alt} />
        <CarouselCaption className="text-light" captionText={item.caption} captionHeader={item.title} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous " onClickHandler={previous} className="text-dark" />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} className="text-dark" />
    </Carousel>
  );
}


export default HomePage;
