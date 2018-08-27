import React from 'react';
import { connect } from 'react-redux';
import matchSorter from 'match-sorter';
import _ from 'lodash';
import selectors from '../../../redux/selectors/index';

import CustomReactTable from 'components/CustomReactTable';
import CheckSentimentForm from 'components/CheckSentimentForm';
import PostCell from 'components/post/cell/index';
import ActionCreators from '../../../redux/actions/index';

class ContentTable extends React.PureComponent {

  state = {
    pageNum: 0,
    pageSize: 10,
  }

  render() {
    const { filter } = this.props;
    // console.log('ContentTable props >>>> ', this.props.contents);
    return (
      <CustomReactTable
        columns={this.getColumns(filter.service, filter.dateFrom, filter.dateTo)}
        data={this.props.contents}
        page={this.state.pageNum}
        pageSize={this.state.pageSize}
        showPageSizeOptions={true}
        onPageChange={this.onPageChange}
        onPageSizeChange={this.handlePageSizeChange}
      />
    )
  }

  onPageChange = pageNum => {
    this.setState({
      pageNum
    });
  }

  handlePageSizeChange = pageSize => {
    this.setState({
      pageSize
    });
  };

  getColumns = () => {
    let defaultColumns = [
      {
        Header: 'No.',
        accessor: '_id',
        Cell: row => (
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '16px' }}>
            <strong>{row.index + 1}</strong>
          </div>
        )
      },
      {
        Header: 'ID',
        accessor: 'fid',
        filterMethod: (filter, row) =>
          row[filter.id].startsWith(filter.value) &&
          row[filter.id].endsWith(filter.value)
      },
      {
        Header: 'Content',
        accessor: 'content',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['content'] }),
        filterAll: true,
        Cell: row => <div style={{ whiteSpace: 'pre-wrap' }}>{row.value}</div>
      },
      {
        Header: 'Post',
        accessor: 'post_content',
        Cell: row => {
          return (
            <PostCell id={row.original.fid} fid={row.original.fid} />
          )
        }
      },
      {
        Header: 'Created Date',
        accessor: 'created_date',
        filterMethod: (filter, row) =>
          row[filter.id].startsWith(filter.value) &&
          row[filter.id].endsWith(filter.value),
        Cell: row => {
          let date = new Date(row.value.toString());
          let fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          return (
            <div style={{ textAlign: 'center', fontSize: '15px' }}>
              <strong>{fullDate}</strong>
            </div>
          );
        }
      },
      {
        Header: 'Sentiments',
        accessor: 'sentiments',
        Cell: ({ value, original }) => {
          return value.map((item, index) => {
            if (item.brand.toLowerCase() !== 'pto') {
              item['id'] = original._id;
              item['fid'] = original.fid;
              item['branchName'] = item.brand;
              item['industryName'] = item.industry;
              item['serviceName'] = this.props.filter.service;
              return <CheckSentimentForm key={index} item={item} />;
            }
          });
        },
        filterMethod: (filter, row) => {
          return true;
          // const newRow = _.cloneDeep(row);
          // console.log('$$$$$$$$$');
          // console.log(row);
          const newRow = row;
          newRow.sentiments = newRow.sentiments.filter(r => r.brand.toLowerCase() !== 'pto');
          if (filter.value === 'all') {
            return true;
          }
          else if (filter.value === 'positive') {
            const newSentiments = newRow.sentiments.filter(x => x.sentiment === '1');
            newRow.sentiments = newSentiments;
            if (newSentiments.length > 0) {
              return true;
            }
            return false;
          }
          else if (filter.value === 'negative') {
            const newSentiments = newRow.sentiments.filter(x => x.sentiment === '-1');
            newRow.sentiments = newSentiments;
            if (newSentiments.length > 0) {
              return true;
            }
            return false;
          }
          else if (filter.value === 'neutral') {
            const newSentiments = newRow.sentiments.filter(x => x.sentiment === '0');
            newRow.sentiments = newSentiments;
            if (newSentiments.length > 0) {
              return true;
            }
            return false;
          }
          else if (filter.value === 'unknown') {
            const newSentiments = newRow.sentiments.filter(x => x.sentiment === '10');
            newRow.sentiments = newSentiments;
            if (newSentiments.length > 0) {
              return true;
            }
            return false;
          }
          else {
            // null sentiments
            const newSentiments = newRow.sentiments.filter(x => x.sentiment === '');
            newRow.sentiments = newSentiments;
            if (newSentiments.length > 0) {
              return true;
            }
            return false;
          }
        },
        Filter: ({ filter, onChange }) => {
          return (
            <select
              onChange={this.handleFilterChange(onChange)}
              style={{ width: "100%", height: '100%' }}
              value={this.props.filter.sentiment}
            >
              <option value="all">All</option>
              <option value="">Nil</option>
              <option value="1">Positive</option>
              <option value="-1">Negative</option>
              <option value="0">Neutral</option>
              <option value="10">Unknown</option>
            </select>
          )
        }
      }
    ];
    if (this.props.filter.service === 'post') {
      _.remove(defaultColumns, function (n) {
        return n.Header === 'Post';
      });
    }
    return defaultColumns;
  }

  handleFilterChange = (onChange) => (event) => {
    // console.log('handleFilterChange ', event.target.value);
    onChange(event.target.value)
    this.props.dispatch(ActionCreators.changeSentimentFilter({ payload: event.target.value }));
    this.props.dispatch(ActionCreators.fetchContentBySentimentType(event.target.value));
  }
}

function mapStateToProps(state, props) {
  const contents = selectors.getContentForTable(state);
  const filter = selectors.getFilter(state);
  return {
    contents,
    filter,
  };
}

export default connect(mapStateToProps)(ContentTable);