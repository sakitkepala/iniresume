import { View, Text, Link } from '@react-pdf/renderer';
import { type Account } from 'src/app/data/resume';
import { pdfStyles } from '../styles';

function SectionProfiles({
  en,
  accounts,
}: {
  en?: boolean;
  accounts: Account[];
}) {
  const nonEmptyAccounts = accounts.filter(
    (account) => account.account && account.url
  );

  if (!nonEmptyAccounts.length) {
    return null;
  }

  return (
    <View style={pdfStyles.contentBlock}>
      <View style={pdfStyles.list}>
        <Text style={pdfStyles.sectionHeading}>
          {!en ? <>Profil</> : <>Profiles</>}
        </Text>

        <View>
          {nonEmptyAccounts.map((account) => (
            <Text key={account.id}>
              {account.account === 'github'
                ? 'Github'
                : account.account === 'linkedin'
                ? 'LinkedIn'
                : account.account}
              : <Link src={account.url}>{account.text || account.url}</Link>
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

export { SectionProfiles };
