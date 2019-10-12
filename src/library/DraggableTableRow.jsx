import React from 'react';
import { Table } from 'semantic-ui-react/';

class DraggableTableRow extends React.Component {
  onDragStart = (ev, i) => {
    ev.dataTransfer.setData('index', i);
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, a) => {
    let b = ev.dataTransfer.getData('index');
    this.props.action(parseInt(a, 10), parseInt(b, 10));
  };

  render() {
    const { i } = this.props;
    return (
      <Table.Row
        draggable
        className='draggable'
        onDragStart={e => this.onDragStart(e, i)}
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => {
          this.onDrop(e, i);
        }}
      >
        {this.props.children}
      </Table.Row>
    );
  }
}

export default DraggableTableRow;
