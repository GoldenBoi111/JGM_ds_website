import React, { useEffect } from 'react';

interface JSONLDSchema {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

interface JSONLDProps {
  schema: JSONLDSchema;
}

const JSONLD: React.FC<JSONLDProps> = ({ schema }) => {
  useEffect(() => {
    // This effect runs when the component mounts
    // The script will be added to the document head
  }, [schema]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JSONLD;