import React, { useMemo, useState } from 'react';
import './index.scss'
import Icons from '../../atoms/icons'
import { Link } from 'react-router-dom';
import Pagination from '../../molecules/pagination';
import data from './mock-data.json';

let PageSize = 10;

export default function Dashboard() {

	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return data.slice(firstPageIndex, lastPageIndex);
	}, [currentPage]);


	return (
		<>
			<h1>Dashboard</h1>
			<div className='content__dashboard-container'>
				<div className='content__dashboard-wrap' >
					<div className='content__dashboard-header'>
						<h2 className='content__dashboard-title'>Content Requests</h2>
					</div>
					<div className='content__dashboard-content'>
						<table>
							<thead>
								<tr>
									<th className='sortable'>
										<Link to='dashboard/?orderby=ID' ><span>ID</span>
											<span className='sorting-indicator'>
												<Icons title='dashicons:arrow-down' class='arrow-sort' />
											</span>
										</Link>
									</th>
									<th className='sortable'>
										<Link to='dashboard/?orderby=post_type'><span>Content Type</span>
											<span className='sorting-indicator'>
												<Icons title='dashicons:arrow-down' class='arrow-sort' />
											</span>
										</Link>
									</th>
									<th className='sortable'>
										<Link to='dashboard/?orderby=post_title' ><span>Title</span>
											<span className='sorting-indicator'>
												<Icons title='dashicons:arrow-down' class='arrow-sort' />
											</span>
										</Link>
									</th>
									<th className='sortable'>
										<Link to='dashboard/?orderby=post_status' ><span>Status</span>
											<span className='sorting-indicator'>
												<Icons title='dashicons:arrow-down' class='arrow-sort' />
											</span>
										</Link>
									</th>
									<th>
										Public Author
									</th>
									<th>
										Requestor
									</th>
									<th>
										Approver
									</th>
									<th>
										Publisher
									</th>
									<th className='sortable'>
										<Link to='dashboard/?orderby=post_date' ><span>Publish Date</span>
											<span className='sorting-indicator'>
												<Icons title='dashicons:arrow-down' class='arrow-sort' />
											</span>
										</Link>
									</th>
									<th className='sortable'>
										<Link to='dashboard/?orderby=post_modified' ><span>Request Date</span>
											<span className='sorting-indicator'>
												<Icons title='dashicons:arrow-down' class='arrow-sort' />
											</span>
										</Link>
									</th>
									<th>
										Action
									</th>
								</tr>
							</thead>

							<tbody>
								{currentTableData.map((item, i) => {
									return (
										<tr key={i}>
											<td>{item.id}</td>
											<td>{item.first_name}</td>
											<td>{item.last_name}</td>
											<td>{item.email}</td>
											<td>{item.phone}</td>
											<td>{item.a1}</td>
											<td>{item.a2}</td>
											<td>{item.a3}</td>
											<td>{item.a4}</td>
											<td>{item.a1}</td>
											<td>{item.a2}</td>
										</tr>
									);
								})}
							</tbody>


						</table>
						<div className='content__pagination-bottom'>
						<Pagination
							// className="pagination-bar"
							currentPage={currentPage}
							totalCount={data.length}
							pageSize={PageSize}
							onPageChange={page => setCurrentPage(page)}
						/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}