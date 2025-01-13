import React from 'react';
    import styled from 'styled-components';
    import { formatDistanceToNow } from 'date-fns';

    const categoryColors = {
      Wildfires: '#ff6b6b',
      'Severe Storms': '#4ecdc4',
      Volcanoes: '#ff9f43',
      Earthquakes: '#f368e0',
      Floods: '#54a0ff',
      Landslides: '#00d2d3',
      Drought: '#feca57'
    };

    const EventCard = ({ event }) => {
      const category = event.categories[0].title;
      const coordinates = event.geometry[0].coordinates;
      const timestamp = formatDistanceToNow(new Date(event.geometry[0].date), { addSuffix: true });

      return (
        <Card>
          <CategoryBadge color={categoryColors[category]}>
            {category}
          </CategoryBadge>
          <Title>{event.title}</Title>
          <Metadata>
            <MetadataItem>
              <Label>Coordinates:</Label>
              <Value>{coordinates[1].toFixed(4)}°N, {coordinates[0].toFixed(4)}°E</Value>
            </MetadataItem>
            <MetadataItem>
              <Label>Occurred:</Label>
              <Value>{timestamp}</Value>
            </MetadataItem>
          </Metadata>
          <Description>{event.description || 'No additional details available'}</Description>
        </Card>
      );
    };

    // Styled components remain the same as previous implementation
    const Card = styled.div`
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
    `;

    const CategoryBadge = styled.span`
      position: absolute;
      top: -10px;
      right: 20px;
      background: ${({ color }) => color};
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    `;

    const Title = styled.h3`
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: #e0e0e0;
      font-weight: 600;
    `;

    const Metadata = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    `;

    const MetadataItem = styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    `;

    const Label = styled.span`
      font-size: 0.8rem;
      color: #a0a0a0;
      font-weight: 500;
    `;

    const Value = styled.span`
      font-size: 0.9rem;
      color: #e0e0e0;
      font-weight: 600;
    `;

    const Description = styled.p`
      font-size: 0.9rem;
      line-height: 1.6;
      color: #c0c0c0;
    `;

    export default EventCard;
