import * as React from 'react';

import Scanner from './Scanner';
import Result from './Result';

interface IState
{
  scanning: boolean;
  results: string[];
}

class ScanPage extends React.Component<any, IState>
{
  constructor(props, context)
  {
    super(props, context);
    this.state = {
      scanning: false,
      results: [],
    };

    this._scan = this._scan.bind(this);
    this._onDetected = this._onDetected.bind(this);
  }

  public render()
  {
    return (
      <div>
        <button onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Start'}</button>
        <ul className="results">
          {this.state.results.map((result: any) => (<Result key={result.codeResult.code} result={result} />))}
        </ul>
        {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
      </div>
    );
  }

  private _scan()
  {
    this.setState((prevState) => ({
      scanning: !prevState.scanning,
    }));
  }

  private _onDetected(result)
  {
    this.setState((prevState) => ({
      results: prevState.results.concat([result]),
    }));
  }
}

export default ScanPage;
