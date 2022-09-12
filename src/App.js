import React from 'react';
import DeckGL, { BitmapLayer } from 'deck.gl';
import { OrthographicView } from '@deck.gl/core';
import { EditableGeoJsonLayer, DrawPolygonMode } from 'nebula.gl';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const myFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    /* insert features here */
  ],
};

const selectedFeatureIndexes = [];
class App extends React.Component {
  state = {
    data: myFeatureCollection,
  };

  render() {
    const bitmapLayer = new BitmapLayer({
      id: 'bitmap-layer',
      bounds: [0, 5400, 5000, 0],
      image:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-districts.png',
    });

    const editableGeoJsonLayer = new EditableGeoJsonLayer({
      id: 'geojson-layer',
      data: this.state.data,
      mode: DrawPolygonMode,
      selectedFeatureIndexes,

      onEdit: ({ updatedData }) => {
        this.setState({
          data: updatedData,
        });
      },
    });

    return (
      <>
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={2}
          initialPositionX={0}
          initialPositionY={0}
          doubleClick={{ disabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
              </div>
              <TransformComponent
                contentStyle={{ width: '100%', height: '100%' }}
                wrapperStyle={{ width: 1000, height: 1000 }}
              >
                <div className="Container">
                  <DeckGL
                    views={[
                      new OrthographicView({
                        id: 'ortho',
                      }),
                    ]}
                    controller={{
                      doubleClickZoom: false,
                      dragPan: false,
                      scrollZoom: false,
                    }}
                    initialViewState={{ target: [2560, 2472], scale: 1 }}
                    layers={[bitmapLayer, editableGeoJsonLayer]}
                  />
                </div>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </>
    );
  }
}

export default App;
