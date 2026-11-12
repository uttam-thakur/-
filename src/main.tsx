import { createRoot } from 'react-dom/client';
import Home from './app/App';
import './styles/globals.css';
import './styles/invitation-cards.css';
import { copy, text } from './content/invitation';
import { coupleNames, dateOnly, primaryEvent } from './helpers/presentation';
import { wedding } from './data/wedding';
const values = { couple: coupleNames(), date: dateOnly(primaryEvent().startsAt) };
document.title = text(copy.metadata.title, values);
document.documentElement.lang = wedding.language;
document
  .querySelector('meta[name=description]')
  ?.setAttribute('content', text(copy.metadata.description, values));
createRoot(document.getElementById('root')!).render(<Home />);
