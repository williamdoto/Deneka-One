import React, { useState } from 'react';
import { Table, Tag, Space, Breadcrumb, Select, Popover } from 'antd';
import { HomeOutlined, TeamOutlined, ScheduleOutlined } from '@ant-design/icons';

const TicketList = () => {
  const [tickets, setTickets] = useState([
    {
      ticketId: 1,
      ticketName: 'Ticket 1',
      categoryId: 1,
      ticketDescription: 'Description for Ticket 1',
      ticketDateStart: '2022-01-01',
      ticketDateUpdated: '2022-01-05',
      ticketDateSolved: '2022-01-10',
      ticketPriority: 'High',
      ticketStatus: true,
      clientId: 1,
      ticketComments: ['Comment 1', 'Comment 2'],
      tags: ['Tag 1', 'Tag 2'],
      transactionId: 123,
      assignee: 456,
      assignedCompany: 789,
    },
    // Add more sample tickets as needed
  ]);

  const [commentPopoverVisible, setCommentPopoverVisible] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);

  const handleMouseEnter = (comments) => {
    setCurrentComments(comments);
    setCommentPopoverVisible(true);
  };

  const handleMouseLeave = () => {
    setCommentPopoverVisible(false);
  };

  const renderCommentsPopover = (comments) => {
    const content = (
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    );
    return (
      <Popover content={content} title="Comments" visible={commentPopoverVisible} onMouseEnter={() => handleMouseEnter(comments)} onMouseLeave={handleMouseLeave}>
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>View Comments</span>
      </Popover>
    );
  };

  const columns = [
    { title: 'Ticket ID', dataIndex: 'ticketId', key: 'ticketId', sorter: (a, b) => a.ticketId - b.ticketId },
    { title: 'Ticket Name', dataIndex: 'ticketName', key: 'ticketName', sorter: (a, b) => a.ticketName.localeCompare(b.ticketName) },
    { title: 'Category ID', dataIndex: 'categoryId', key: 'categoryId', sorter: (a, b) => a.categoryId - b.categoryId },
    { title: 'Ticket Description', dataIndex: 'ticketDescription', key: 'ticketDescription' },
    { title: 'Start Date', dataIndex: 'ticketDateStart', key: 'ticketDateStart', sorter: (a, b) => new Date(a.ticketDateStart) - new Date(b.ticketDateStart) },
    { title: 'Updated Date', dataIndex: 'ticketDateUpdated', key: 'ticketDateUpdated', sorter: (a, b) => new Date(a.ticketDateUpdated) - new Date(b.ticketDateUpdated) },
    { title: 'Solved Date', dataIndex: 'ticketDateSolved', key: 'ticketDateSolved', sorter: (a, b) => new Date(a.ticketDateSolved) - new Date(b.ticketDateSolved) },
    { title: 'Priority', dataIndex: 'ticketPriority', key: 'ticketPriority', sorter: (a, b) => a.ticketPriority.localeCompare(b.ticketPriority) },
    {
      title: 'Status',
      dataIndex: 'ticketStatus',
      key: 'ticketStatus',
      render: status => <Tag color={status ? 'green' : 'red'}>{status ? 'Open' : 'Closed'}</Tag>,
      sorter: (a, b) => a.ticketStatus - b.ticketStatus,
    },
    { title: 'Client ID', dataIndex: 'clientId', key: 'clientId', sorter: (a, b) => a.clientId - b.clientId },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: tags => (
        <>
          {tags.map(tag => (
            <Tag key={tag} color="orange">
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId', sorter: (a, b) => a.transactionId - b.transactionId },
    { title: 'Assignee', dataIndex: 'assignee', key: 'assignee', sorter: (a, b) => a.assignee - b.assignee },
    { title: 'Assigned Company', dataIndex: 'assignedCompany', key: 'assignedCompany', sorter: (a, b) => a.assignedCompany - b.assignedCompany },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb style={{ margin: '20px 20px' }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <TeamOutlined />
          <span>Teams</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <ScheduleOutlined />
          <span>All Tickets</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Table
        dataSource={tickets}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onMouseEnter: (event) => {
              handleMouseEnter(record.ticketComments);
            },
            onMouseLeave: (event) => {
              handleMouseLeave();
            },
          };
        }}
      />
    </>
  );
};

export default TicketList;
