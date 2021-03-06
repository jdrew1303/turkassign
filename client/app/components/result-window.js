import React from 'react';
import Config from './config';
import Algorithm from './algorithm';
import Tasks from './tasks';
import HitConfig from './hit-config';
import HitResult from './hit-result';
import TaskPool from './task-pool';
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
          return <Tasks disabled={ true } />;
          break;
        case 'hitConfig':
          return <HitConfig disabled={ true } />;
          break;
        case 'hitResult':
          return <HitResult result={ this.props.result.hitResult } />;
          break;
        case 'taskPool':
          return <TaskPool taskGroupId={ this.props.result.taskGroupId } />;
          break;
      }
    };

    const navGroups = {
      'Settings': [
        { name: 'config', title: 'Config' },
        { name: 'algorithm', title: 'Algorithm' },
        { name: 'tasks', title: 'Tasks' },
        { name: 'hitConfig', title: 'HIT Config' },
      ],
      'Result': [
        { name: 'hitResult', title: 'HIT Result' },
        { name: 'taskPool', title: 'Task Pool Monitor' },
      ]
    };

    return (
      <div className="window">
        <div className="window-content">
          <div className="pane-group">
            <NavGroups groups={ navGroups } onItemChange={ this.onNavItemChange.bind(this) }
              defaultItem={ defaultActiveNavItem } />
            <div className="pane content-pane">
              { showContent() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
