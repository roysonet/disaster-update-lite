import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import styled from 'styled-components';
    import { FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi';
    import EventCard from './components/EventCard';
    import LoadingSpinner from './components/LoadingSpinner';

    const API_URL = 'https://eonet.gsfc.nasa.gov/api/v3/events';

    const App = () => {
      const [events, setEvents] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 12;

      const fetchData = async () => {
        try {
          const response = await axios.get(API_URL);
          setEvents(response.data.events);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

      const paginate = (pageNumber) => setCurrentPage(pageNumber);

      useEffect(() => {
        fetchData();
      }, []);

      if (loading) return <LoadingSpinner />;
      if (error) return <ErrorDisplay>{error}</ErrorDisplay>;

      return (
        <Container>
          <Header>
            <Title>Global Disaster Alerts</Title>
            <RefreshButton onClick={fetchData}>
              <FiRefreshCw />
            </RefreshButton>
          </Header>
          <EventGrid>
            {currentItems.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </EventGrid>
          <Pagination>
            <PaginationButton 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </PaginationButton>
            <PageInfo>
              Page {currentPage} of {Math.ceil(events.length / itemsPerPage)}
            </PageInfo>
            <PaginationButton 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === Math.ceil(events.length / itemsPerPage)}
            >
              <FiChevronRight />
            </PaginationButton>
          </Pagination>
        </Container>
      );
    };

    // Styled components remain the same as previous implementation
    const Container = styled.div`
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: radial-gradient(circle at top left, #1a1a2e, #16213e);
    `;

    const Header = styled.header`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    const Title = styled.h1`
      font-size: 2rem;
      font-weight: 600;
      color: #e0e0e0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    `;

    const RefreshButton = styled.button`
      background: rgba(255, 255, 255, 0.1);
      border: none;
      padding: 0.75rem;
      border-radius: 50%;
      cursor: pointer;
      color: #e0e0e0;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(180deg);
      }
    `;

    const EventGrid = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    `;

    const Pagination = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: auto;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    const PaginationButton = styled.button`
      background: rgba(52, 152, 219, 0.8);
      border: none;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background: rgba(41, 128, 185, 0.9);
        transform: translateY(-2px);
      }

      &:disabled {
        background: rgba(189, 195, 199, 0.5);
        cursor: not-allowed;
      }
    `;

    const PageInfo = styled.span`
      font-size: 0.9rem;
      color: #e0e0e0;
      font-weight: 500;
    `;

    export default App;
