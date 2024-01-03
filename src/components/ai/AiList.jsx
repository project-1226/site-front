import React, { useState } from 'react';
import { Card, Col,Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AiList = () => {

    const [books, setBooks] = useState([
        { bid: 1, title: '스쿼트', image: 'http://via.placeholder.com/170x250', rcnt: 10 },
        { bid: 2, title: '플랭크', image: 'http://via.placeholder.com/170x250', rcnt: 5 },
        { bid: 3, title: '등등', image: 'http://via.placeholder.com/170x250', rcnt: 5 },
        { bid: 4, title: '머머', image: 'http://via.placeholder.com/170x250', rcnt: 5 },

        // 추가 도서 정보...
      ]);




  return (


<div className='my-5'>  
        <h1>AI 트레이너</h1>
        <hr></hr>
        <h2>목록</h2>
        <Row>
             {books.map(book => (
    
           <Col xs={6} md={4} lg={2} className='mb-3' key={book.bid}>
              <Card>
                   <Card.Body>
                       <NavLink to={`/books/info/${book.bid}`}>
                             <img src={book.image || "http://via.placeholder.com/170x250"} width="100%" alt={book.title} />
                        </NavLink>
                          <small className='ellipsis mt-2'>{book.title}</small>
                   </Card.Body>
            <Card.Footer className="text-end">
              {book.rcnt === 0 ||
                <span>
                  <span className='message'> {/* 아이콘 또는 메시지 표시 부분 */}
                    {/* ... */}
                  </span>
                  <span className='ms-1 rcnt'>{book.rcnt}</span>
                </span>
              }
              {/* 하트 아이콘 및 좋아요 개수 표시 부분 */}
              {/* ... */}
            </Card.Footer>
             </Card>
             </Col>
                ))}
             </Row>
    </div>
  )
}

export default AiList