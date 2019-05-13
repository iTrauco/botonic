import {
  Text,
  Button,
  Pic,
  Carousel,
  Title,
  Subtitle,
  Element
} from '@botonic/react';
import * as React from 'react';
import * as cms from '../cms';

export class Renderer {
  element(msg: cms.Element, index: number): React.ReactNode {
    return (
      <Element key={index}>
        <Pic src={msg.imgUrl || ''} />
        <Title>{msg.title || ''}</Title>
        <Subtitle>{msg.subtitle || ''}</Subtitle>
        {this.buttons(msg.buttons)}
      </Element>
    );
  }

  carousel(carousel: cms.Carousel): React.ReactNode {
    return (
      <>
        <Carousel>
          {carousel.elements.map((element, i) => this.element(element, i))}
        </Carousel>
      </>
    );
  }

  text(text: cms.Text, delayS: number = 0): React.ReactNode {
    let node = (
      <Text delay={delayS}>
        {text.text}
        {this.buttons(text.buttons)}
      </Text>
    );
    if (text.followup) {
      return (
        <>
          {node}
          {this.followUp(text.followup)}
        </>
      );
    }
    return node;
  }

  private followUp(followUp: cms.Text | cms.Carousel): React.ReactNode {
    if (followUp instanceof cms.Text) {
      // give use time to read the initial text
      return this.text(followUp, 3);
    }
    // for carousels, the initial text usually introduces the carousel
    return this.carousel(followUp);
  }

  private buttons(buttons: cms.Button[]): React.ReactNode {
    return (
      <>
        {buttons.map((button, index) => {
          return (
            <Button
              key={index}
              payload={button.callback.payload}
              url={button.callback.url}
            >
              {button.text}
            </Button>
          );
        })}
      </>
    );
  }
}
