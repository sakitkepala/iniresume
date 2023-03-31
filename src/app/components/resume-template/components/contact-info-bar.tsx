import * as React from 'react';
import { StyleSheet, View, Text, Link } from '@react-pdf/renderer';
import { type ResumeData } from 'src/app/data/resume';

const styles = StyleSheet.create({
  inlineContact: {
    marginTop: 10,
    paddingTop: 2,
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
});

function ContactInfoBar({ data }: { data: ResumeData }) {
  const contactItems: React.ReactNode[] = React.useMemo(() => {
    const website = !data.website?.url ? undefined : (
      <Link
        key={data.website.url || 'website-url'}
        src={data.website.url || ''}
      >
        {data.website?.text || data.website.url}
      </Link>
    );

    const phone = !data.phone?.number ? undefined : data.phone.wa ? (
      <Link
        key={data.phone.number}
        src={`https://wa.me/62${data.phone.number}`}
      >
        {'+62' + data.phone.number}
      </Link>
    ) : (
      <Text key={data.phone.number}>{'+62' + data.phone.number}</Text>
    );

    const email = !data.email ? undefined : (
      <Link key={data.email} src={`mailto:${data.email}`}>
        {data.email}
      </Link>
    );

    const items: React.ReactNode[] = [website, phone, email]
      .filter((item) => typeof item !== 'undefined')
      .reduce<React.ReactNode[]>((items, item, index, originalItems) => {
        if (!item) {
          return items;
        }
        const isLast = index === originalItems.length - 1;
        return !isLast
          ? [...items, item, <Text key={index}>&#47;</Text>]
          : [...items, item];
      }, []);

    return items;
  }, [data]);

  return <View style={styles.inlineContact}>{contactItems}</View>;
}

export { ContactInfoBar };
