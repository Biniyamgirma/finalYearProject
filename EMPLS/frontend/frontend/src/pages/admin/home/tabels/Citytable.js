import React, { useState } from 'react';

const PostTable = ({ data, title = 'POST TABLE' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const styles = {
    container: {
      padding: '1rem',
    },
    title: {
      marginBottom: '0.75rem',
    },
    searchInput: {
      width: '100%',
      padding: '0.5rem',
      marginBottom: '0.75rem',
      border: '1px solid #ced4da',
      borderRadius: '0.25rem',
      backgroundColor: '#e9ecef',
    },
    tableResponsive: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    thead: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
    thTd: {
      padding: '0.5rem',
      border: '1px solid #dee2e6',
      textAlign: 'left',
    },
    tbody: {
      backgroundColor: '#e9ecef',
    },
    statusDot: {
      display: 'inline-block',
      width: '10px',
      height: '10px',
      backgroundColor: '#28a745',
      borderRadius: '50%',
    },
    criminal: {
      color: '#dc3545',
    },
    pictureIcon: {
      color: '#f5a623',
    },
    linkIcon: {
      color: '#007bff',
      marginRight: '0.5rem',
    },
    handIcon: {
      color: '#f5a623',
    },
    emptyRow: {
      height: '50px',
      backgroundColor: '#e9ecef',
    },
  };

  // Default data if none provided
  const tableData = data || [
    {
      postId: '123456',
      fname: 'ALEMAYEW',
      lname: 'YERGAW',
      mname: 'ALEKA',
      date: '07:23:2017',
      postState: true,
      personState: 'CRIMINAL',
      picture: true,
      icons: ['link', 'hand'],
    },
  ];

  // Filter data based on search term
  const filteredData = tableData.filter(item =>
    item.postId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.personState.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h5 style={styles.title}>{title}</h5>
      <input
        type="text"
        placeholder="Search with post id, name, or person state..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      <div style={styles.tableResponsive}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.thTd}>POST ID</th>
              <th style={styles.thTd}>FNAME</th>
              <th style={styles.thTd}>LNAME</th>
              <th style={styles.thTd}>MNAME</th>
              <th style={styles.thTd}>DATE</th>
              <th style={styles.thTd}>POST STATES</th>
              <th style={styles.thTd}>PERSON STATES</th>
              <th style={styles.thTd}>PICTURE</th>
              <th style={styles.thTd}>ICONS</th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td style={styles.thTd}>{item.postId}</td>
                <td style={styles.thTd}>{item.fname}</td>
                <td style={styles.thTd}>{item.lname}</td>
                <td style={styles.thTd}>{item.mname}</td>
                <td style={styles.thTd}>{item.date}</td>
                <td style={styles.thTd}>
                  <span style={styles.statusDot}></span>
                </td>
                <td style={{ ...styles.thTd, ...(item.personState === 'CRIMINAL' ? styles.criminal : {}) }}>
                  {item.personState}
                </td>
                <td style={styles.thTd}>
                  {item.picture && <span style={styles.pictureIcon}>📷</span>}
                </td>
                <td style={styles.thTd}>
                  {item.icons.includes('link') && <span style={styles.linkIcon}>🔗</span>}
                  {item.icons.includes('hand') && <span style={styles.handIcon}>🤝</span>}
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <>
                <tr><td colSpan="9" style={styles.emptyRow}></td></tr>
                <tr><td colSpan="9" style={styles.emptyRow}></td></tr>
                <tr><td colSpan="9" style={styles.emptyRow}></td></tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostTable;