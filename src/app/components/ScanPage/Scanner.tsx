import * as React from 'react';
import * as Quagga from 'quagga';

interface IProps
{
  onDetected: (result: string) => void;
}

class Scanner extends React.Component<IProps, any>
{
  constructor(props, context)
  {
    super(props, context);

    this._onDetected = this._onDetected.bind(this);
  }

  public componentDidMount()
  {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        constraints: {
          width: window.screen.width * 0.9,
          height: window.screen.height * 0.9,
          facing: 'environment', // or user
        },
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      numOfWorkers: navigator.hardwareConcurrency,
      decoder: {
        readers: ['ean_reader'],
        debug: {
          drawBoundingBox: true,
          showFrequency: false,
          drawScanline: true,
          showPattern: false,
        },
      },
      locate: true,
    }, (err) =>
      {
        if (err)
        {
          // tslint:disable-next-line:no-console
          return console.log(err);
        }
        Quagga.start();
      });
    Quagga.onDetected(this._onDetected);
  }

  public componentWillUnmount()
  {
    Quagga.offDetected(this._onDetected);
  }

  public render()
  {
    return (
      <div id="interactive" className="viewport" />
    );
  }

  private _onDetected(result)
  {
    this.props.onDetected(result);
  }
}

export default Scanner;
