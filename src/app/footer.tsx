export default function Footer() {
  return (
    <div className="grid place-items-center p-4 bg-slate-800 text-white text-sm">
      <p>
        This site does not store any files on its server. All contents are
        provided by non-affiliated third parties.
      </p>
      <p>Copyright &copy;{new Date().getFullYear()} Rush B</p>
    </div>
  );
}
