import { connect } from 'react-redux';
import RedirectToQuote from '../components/RedirectToQuote';

const mapStateToProps = ({ nextId }) => ({ quoteId: nextId });

export default connect(mapStateToProps)(RedirectToQuote);