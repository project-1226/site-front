import React from 'react'
import SideMenu from './SideMenu'
import { Table, Row, Col } from 'react-bootstrap'


const ReviewPage = () => {
    return (
        <div>
            <Row>
                <Col md={3}>
                    <SideMenu />
                </Col>
                <Col className='my-5 justify-content-center'>
                    <Table size="sm" width="80%" className='text-center mb-2'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>Writer</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><a href='/'>회원 후기입니다.</a></td>
                                <td>userid</td>
                                <td>2023-12-30</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>no.</td>
                                <td>title</td>
                                <td>wirter</td>
                                <td>regdate</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default ReviewPage