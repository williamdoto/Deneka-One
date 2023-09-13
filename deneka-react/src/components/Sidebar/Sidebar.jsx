import React from 'react';
import './Sidebar.css';
import { ChevronRight, ChevronLeft } from 'react-bootstrap-icons';

class Sidebar extends React.Component {
    state = {
        isCollapsed: false
    }

    toggleCollapse = () => {
        console.log('Toggling collapse...'); // Debugging statement

        this.setState(prevState => {
            console.log('Previous state:', prevState.isCollapsed); // Debugging statement
            return { isCollapsed: !prevState.isCollapsed };
        }, () => {
            console.log('Updated state:', this.state.isCollapsed); // Debugging statement
        });
    }

    render() {
        const { isCollapsed } = this.state;

        return (
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div onClick={this.toggleCollapse}>
                    {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                </div>
                <div className="sidebar-item">
                    <span className="icon">{"🎵"}</span>
                    {!isCollapsed && <span className="title">{"Music"}</span>}
                </div>
                <div className="sidebar-item">
                    <span className="icon">{"🎧"}</span>
                    {!isCollapsed && <span className="title">{"Podcasts"}</span>}
                </div>

                {/* ... Add more SidebarItems as needed ... */}
            </div>
        );
    }
}

export default Sidebar;
