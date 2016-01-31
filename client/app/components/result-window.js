import React from 'react';
import Config from './config';
import Algorithm from './algorithm';
import Tasks from './tasks';
import NavGroups from './nav-groups';

const defaultActiveNavItem = 'hitResult';

export default class ResultWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNavItem: defaultActiveNavItem
    };
  }
  onNavItemChange(item) {
    this.setState({
      activeNavItem: item
    });
  }
  render() {
    const showContent = () => {
      switch (this.state.activeNavItem) {
        case 'config':
          return <Config disabled={ true } />;
          break;
        case 'algorithm':
          return <Algorithm disabled={ true } />;
          break;
        case 'tasks':
          return <Tasks />;
          break;
      }
    };

    const navGroups = {
      'Settings': [
        { name: 'config', title: 'Config' },
        { name: 'algorithm', title: 'Algorithm' },
        { name: 'tasks', title: 'Tasks' },
      ],
      'Result': [
        { name: 'hitResult', title: 'HIT Result' },
      ]
    };

    return (
      <div className="window">
        <div className="window-content">
          <div className="pane-group">
            <NavGroups groups={ navGroups } onItemChange={ this.onNavItemChange.bind(this) }
              defaultItem={ defaultActiveNavItem } />
            <div className="pane">
              { showContent() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
